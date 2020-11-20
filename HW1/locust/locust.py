from locust import HttpUser, between, task


class WebsiteUser(HttpUser):
    wait_time = between(5, 15)

    @task
    def index_page(self):
        self.client.get("/")

    @task
    def node_sha(self):
        self.client.post("/node/sha", {
            "number1": "10",
            "number2": "1"
        })

    @task
    def go_sha(self):
        self.client.post("/go/sha", {
            "number1": "10",
            "number2": "1"
        })

    @task
    def go_write(self):
        self.client.get("/go/write?lineNumber=10")

    @task
    def node_write(self):
        self.client.get("/node/write?lineNumber=10")
