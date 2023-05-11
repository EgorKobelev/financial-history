import $api from "../http";

export class OperationService {
    static async getLastOperations() {
        return await $api.get("/Operation/lastOperations");
    }

    static async createOperaion(form) {
        return await $api.post("/Operation/create", form);
    }

    static async deleteOperaion(form) {
        console.log(form);
        return await $api.post(`/Operation/delete`, form);
    }

    static async updateOperaion(form) {
        return await $api.put("/Operation/update", form);
    }

    static async getBalance() {
        return await $api.get("/Operation/getBalance");
    }

    static async createBalance(newBalance) {
        return await $api.patch("/Operation/createBalance", { newBalance: newBalance });
    }

    static async getSumByType(type) {
        return await $api.post("/Operation/getSumByType", { type: type });
    }

    static async getLastFiveOperationsBothTypeAsync() {
        const date = new Date();
        date.toISOString();
        return await $api.post("/Operation/getLastFiveOperationsBothTypeAsync", { dateTime: date });
    }
}
