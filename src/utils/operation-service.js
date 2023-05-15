import $api from "../http";

export class OperationService {
    static async createOperaion(form) {
        return await $api.post("/Operation/create", form);
    }

    static async deleteOperaion(id) {
        return await $api.delete(`/Operation/delete/${id}`);
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

    static async getSumByType(form) {
        const params = {
            type: form.type,
            dateTime: form.dateTime,
        };
        return await $api.get("/Operation/getSumByType", { params });
    }

    static async getOperationsByType(form) {
        const params = {
            dateTime: form.dateTime,
            quantity: form.quantity,
        };
        return await $api.get("/Operation/getOperationsByType", { params });
    }
}
