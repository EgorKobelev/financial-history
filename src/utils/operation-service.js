import $api from "../http";

export class OperationService {
    static async getLastOperations() {
        return await $api.get("/Operation/lastOperations");
    }
    static async createOperaion(type, price, date, categoryId) {
        return await $api.post("/Operation/create", {
            type,
            price,
            date,
            categoryId,
        });
    }
    static async updateOperaion(operationId, date, price) {
        return await $api.post("/Operation/create", {
            operationId,
            date,
            price,
        });
    }
    static async deleteOperaion(operationId) {
        return await $api.post("/Operation/create", {
            operationId,
        });
    }
}
