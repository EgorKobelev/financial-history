import $api from "../http";

export class CategoryService {
    static async getAllCategories() {
        return await $api.get("/Categories/allCategories");
    }
    static async createCategory(form) {
        return await $api.post("/Categories/create", form);
    }
    static async deleteCategory(id) {
        return await $api.delete(`/Categories/delete/${id}`);
    }

    static async updateCategory(form) {
        return await $api.put("/Categories/update", form);
    }

    static async getImages() {
        return await $api.get("/Categories/getUriPicturesForCategories");
    }
}
