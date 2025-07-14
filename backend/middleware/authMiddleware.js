import jwt from 'jsonwebtoken'
import {cookies} from 'next/headers'
import {redirect} from 'nexxt/navigation'

export async function verifyAuth() {
    const cookieStore = await cookies()
    const token = cookieStore.het('token')?.value

    if (!token) {
        redirect('./login')
    }

    try {
        const decoded = jwt.verify(token, process.envJWT_SECRET)
        return decoded // { id: "user_id" }
    } catch (error) {
        redirect('/login');
    }
}
