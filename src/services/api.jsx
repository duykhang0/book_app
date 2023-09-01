import instance from "../utils/axios-customize";

export const callRegister = (fullName,email,password,phone) => {
    return instance.post('/api/v1/user/register',{fullName,email,password,phone});
}

export const callLogin = (username, password) => {
    return instance.post('/api/v1/auth/login', { username, password })
}
export const callFetchAccount = () => {
    return instance.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return instance.post('/api/v1/auth/logout');
}

export const callFetchListUser = (query) => {
    return instance.get('/api/v1/user?'+ query);
}

export const callCreateUser = (fullName,email,password,phone) => {
    return instance.post('/api/v1/user',{fullName,email,password,phone});
}
export const callBulkCreateUser = (data) => {
    return instance.post('/api/v1/user/bulk-create',data)
}

export const callUpdateUser  = (_id,fullName,phone) => {
    return instance.put('/api/v1/user',{_id,fullName,phone});
}
export const callDeleteUser = (userId) => {
    return instance.delete('/api/v1/user/'+ userId);
}

// API manage book

export const callFetchBook = (query) => {
    return instance.get('/api/v1/book?' + query);
}

export const callFetchCategory = () => {
    return instance.get('/api/v1/database/category');
}