// import axios from 'axios';


// const baseURL= 'http://216.230.74.17:8013'

// const interceptor=axios.create({
//     baseURL,
//     headers:{
//         Authorization:'Bearer ${accessTokens.access}',
//     }
// });

// interceptor.interceptors.response.use(
//     (response)=>{
//         return response;
//     }


// )

// export default interceptor;



import axios from 'axios';

const baseURL = 'http://216.230.74.17:8013/api';

const interceptor = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${accessTokens.access}`,
    }
});

function createAxiosResponseInterceptor() {
    interceptor.interceptors.response.use(
        (response) => response,
        (error) => {
            
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            interceptor.interceptors.response.eject(interceptor);

            return axios
                .post("/Auth/refresh_token", {
                    accessToken:localStorage.getItem("myToken"),
                    refreshToken:localStorage.getItem("refreshToken"),
                })
                .then((response) => {
                  
                    localStorage.setItem('myToken', response.data.myToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    error.response.config.headers["Authorization"] =
                        "Bearer " + response.data.access_token;
                  
                    return interceptor(error.response.config);
                })
                .catch((error2) => {
                  
                    this.router.push("/login");
                    return Promise.reject(error2);
                })
                .finally(() => {
                    createAxiosResponseInterceptor();
                });
        }
    );
}

createAxiosResponseInterceptor();

// export default interceptor;


