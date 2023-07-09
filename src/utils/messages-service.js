import $api from "../http";

export class MessagesService {
    static async getHistory({ page }) {
        const params = {
            Page: page,
            Count: 16,
        };
        return await $api.get("/Message/getMessages", { params });
    }
}
