use tonic::{transport::Server, Request, Response, Status};
use yasai::yasai_service_server::{YasaiService, YasaiServiceServer};
use yasai::{GetYasaiRequest, GetYasaiResponse};
use std::fs::File;
use std::io::BufReader;
use serde_json::Value;

pub mod yasai {
    tonic::include_proto!("yasai");
}

#[derive(Default)]
pub struct MyYasaiService {}

#[tonic::async_trait]
impl YasaiService for MyYasaiService {
    async fn get_yasai(
        &self,
        request: Request<GetYasaiRequest>,
    ) -> Result<Response<GetYasaiResponse>, Status> {

        let file = File::open("./src/yasai.json").unwrap();
        let reader = BufReader::new(file);
        let store: Value = serde_json::from_reader(reader).unwrap();

        let tenpo = request.into_inner().tenpo;
        let volume = match store.get(&tenpo) {
            Some(v) => v.clone().to_string(),
            None => "Store not found".to_string(),
        };

        println!("Request: {:?}", tenpo);
        println!("Response: {:?}", volume);

        let reply = yasai::GetYasaiResponse {
            volume,
        };
        Ok(Response::new(reply))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("Starting server on Yasai port 50051");

    let addr = "127.0.0.1:50051".parse()?;
    let yasai_service = MyYasaiService::default();

    Server::builder()
        .add_service(YasaiServiceServer::new(yasai_service))
        .serve(addr)
        .await?;

    Ok(())
}
