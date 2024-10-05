import grpc
import backend.buta.buta_pb as buta_pb
import backend.buta.buta_pb_grpc as buta_pb_grpc
from concurrent import futures
import json

class ButaServiceServicer(buta_pb_grpc.ButaServiceServicer):
    def __init__(self):
        with open('buta.json') as json_file:
            self.data = json.load(json_file)

    def GetButa(self, request, context):
        tenpo = request.tenpo
        if tenpo in self.data:
            volume = self.data[tenpo]
            print(f"GetButa: {tenpo} {volume}")
        else:
            volume = "not found"
        return buta_pb.GetButaResponse(volume=str(volume))

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    buta_pb_grpc.add_ButaServiceServicer_to_server(ButaServiceServicer(), server)
    server.add_insecure_port('[::]:50054')
    server.start()
    print("start server on Buta port 50054")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
