use hyper::{Body, Request, Response, Server, Method, StatusCode};
use hyper::service::{make_service_fn, service_fn};
use serde::{Serialize, Deserialize};
use std::sync::{Arc, Mutex};
use std::collections::HashMap;
use std::convert::Infallible;

#[derive(Serialize, Deserialize, Clone)]
struct Person {
    nome: String,
    idade: u32,
}

// Banco de dados em memória (id, Person)
type Db = Arc<Mutex<HashMap<u64, Person>>>;

// Estado da aplicação, incluindo o db e um contador para gerar IDs
struct AppState {
    db: Db,
    next_id: Mutex<u64>,
}

type SharedState = Arc<AppState>;

// Função que trata as requisições HTTP
async fn handle_request(req: Request<Body>, state: SharedState) -> Result<Response<Body>, Infallible> {
    let method = req.method().clone();
    let path = req.uri().path().to_string();
    // Divide a rota em segmentos para identificar, por exemplo, /person e /person/{id}
    let segments: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();

    let mut response = Response::new(Body::empty());

    match (method, segments.as_slice()) {
        // Listar todas as pessoas
        (Method::GET, ["person"]) => {
            let db = state.db.lock().unwrap();
            let persons: Vec<(u64, Person)> = db.iter().map(|(id, person)| (*id, person.clone())).collect();
            let json = serde_json::to_string(&persons).unwrap();
            *response.body_mut() = Body::from(json);
        },
        // Criar uma nova pessoa
        (Method::POST, ["person"]) => {
            let whole_body = hyper::body::to_bytes(req.into_body()).await.unwrap();
            let new_person: Person = match serde_json::from_slice(&whole_body) {
                Ok(p) => p,
                Err(e) => {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    *response.body_mut() = Body::from(format!("Erro ao parsear JSON: {}", e));
                    return Ok(response);
                }
            };

            let mut id_guard = state.next_id.lock().unwrap();
            let id = *id_guard;
            *id_guard += 1;
            drop(id_guard);

            let mut db = state.db.lock().unwrap();
            db.insert(id, new_person);
            *response.status_mut() = StatusCode::CREATED;
            *response.body_mut() = Body::from(format!("Registro criado com ID: {}", id));
        },
        // Obter uma pessoa pelo ID
        (Method::GET, ["person", id_str]) => {
            let id: u64 = match id_str.parse() {
                Ok(num) => num,
                Err(_) => {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    *response.body_mut() = Body::from("ID inválido");
                    return Ok(response);
                }
            };
            let db = state.db.lock().unwrap();
            if let Some(person) = db.get(&id) {
                let json = serde_json::to_string(&person).unwrap();
                *response.body_mut() = Body::from(json);
            } else {
                *response.status_mut() = StatusCode::NOT_FOUND;
                *response.body_mut() = Body::from("Registro não encontrado");
            }
        },
        // Atualizar uma pessoa existente
        (Method::PUT, ["person", id_str]) => {
            let id: u64 = match id_str.parse() {
                Ok(num) => num,
                Err(_) => {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    *response.body_mut() = Body::from("ID inválido");
                    return Ok(response);
                }
            };
            let whole_body = hyper::body::to_bytes(req.into_body()).await.unwrap();
            let updated_person: Person = match serde_json::from_slice(&whole_body) {
                Ok(p) => p,
                Err(e) => {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    *response.body_mut() = Body::from(format!("Erro ao parsear JSON: {}", e));
                    return Ok(response);
                }
            };

            let mut db = state.db.lock().unwrap();
            if db.contains_key(&id) {
                db.insert(id, updated_person);
                *response.body_mut() = Body::from("Registro atualizado com sucesso");
            } else {
                *response.status_mut() = StatusCode::NOT_FOUND;
                *response.body_mut() = Body::from("Registro não encontrado");
            }
        },
        // Excluir uma pessoa pelo ID
        (Method::DELETE, ["person", id_str]) => {
            let id: u64 = match id_str.parse() {
                Ok(num) => num,
                Err(_) => {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    *response.body_mut() = Body::from("ID inválido");
                    return Ok(response);
                }
            };
            let mut db = state.db.lock().unwrap();
            if db.remove(&id).is_some() {
                *response.body_mut() = Body::from("Registro deletado com sucesso");
            } else {
                *response.status_mut() = StatusCode::NOT_FOUND;
                *response.body_mut() = Body::from("Registro não encontrado");
            }
        },
        // Rota não encontrada
        _ => {
            *response.status_mut() = StatusCode::NOT_FOUND;
            *response.body_mut() = Body::from("Rota não encontrada");
        },
    }

    Ok(response)
}

#[tokio::main]
async fn main() {
    // Inicialização do estado compartilhado (db e contador de IDs)
    let state = Arc::new(AppState {
        db: Arc::new(Mutex::new(HashMap::new())),
        next_id: Mutex::new(1),
    });

    let make_svc = make_service_fn(move |_conn| {
        let state = state.clone();
        async move {
            Ok::<_, Infallible>(service_fn(move |req| {
                handle_request(req, state.clone())
            }))
        }
    });

    let addr = ([127, 0, 0, 1], 3000).into();

    println!("Servidor rodando em http://{}", addr);

    let server = Server::bind(&addr).serve(make_svc);

    if let Err(e) = server.await {
        eprintln!("Erro no servidor: {}", e);
    }
}