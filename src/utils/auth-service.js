import $api from "../http";

export class AuthService {
    static async login(email, password) {
        return await $api.post("/Authorize/signin", {
            email: email,
            password: password,
            rememberMe: false,
        });
    }

    static async register(email, password, name) {
        return await $api.post("/Authorize/register", {
            email: email,
            password: password,
            name: name,
        });
    }

    static async update(email, currentPassword, newPassword, name) {
        return await $api.put("/Authorize/updateUser", {
            email: email,
            newPassword: newPassword,
            currentPassword: currentPassword,
            name: name,
        });
    }

    static async tokenLogin() {
        return await $api.post("/Authorize/signinWithAccess", null, { withCredentials: true });
    }

    static async logout() {
        return await $api.post("/Authorize/signout"), null, { withCredentials: true };
    }
}
