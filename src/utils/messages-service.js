import $api from "../http";

export class MessagesService {
    static async getHistory({ page }) {
        const params = {
            Count: 10,
            Page: page,
        };
        return await $api.post("/Message/getMessages", { params });
    }
}
