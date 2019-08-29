export const reset = {
    methods: {
        reset() {
            if(this.loginUser) {
                this.loginUser.email = '';
                this.loginUser.password = '';
            }
            if(this.formNewUser) {
                this.formNewUser.email = '';
                this.formNewUser.password = '';
                this.formNewUser.confirmPassword = '';
                this.formNewUser.handle = '';
            }
        }
    }
}