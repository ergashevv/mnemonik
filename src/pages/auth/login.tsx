import axios from 'axios'
import './auth.scss'
import { useState } from 'react'
import { useHomeContext } from '../../context/home-context'
const Login = () => {
  const { setToken } = useHomeContext()
  const [phone, setPhone] = useState<string>()
  const [password, setPassword] = useState<string>()
  const submitHandler = (e: any) => {
    e.preventDefault()
    axios
      .post('http://192.168.0.159:3333/auth/local/login', {
        phone: phone,
        password: password,
      })
      .then((response: any) => {
        console.log(response.data)
        setToken(response.data.access_token)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  return (
    <>
      <div className='register-main container'>
        <form className='register-form load-anim' onSubmit={submitHandler}>
          <h1 className='register-title'>Login o'ting</h1>
          <label className='register-label'>
            <div>
              <input
                type='text'
                name='phone'
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                placeholder='telefon raqam'
              />
            </div>
          </label>
          <label className='register-label'>
            <div>
              <input
                name='password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder='parol'
                type='password'
              />
            </div>
          </label>
          <button className='register-submit' type='submit'>
            Ro'yxatdan o'tish
          </button>
        </form>
      </div>
    </>
  )
}
export default Login
