import { Icon } from '@iconify/react'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { IconLogoGoogle } from '../../assets/icons'

const FormLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [userName, setUsername] = useState('')
  const [password, setPassWord] = useState('')

  const [validateSignUpPassword, setValidateSignUpPassword] = useState(null)
  const [checkPassword, setCheckPassword] = useState(true)

  const handleLogin = () => {}
  const handleSignUp = () => {}

  const handleLoginWithGoogle = () => {}
  return (
    <>
      <div className="h-full w-full space-y-9 mt-9 login-form-bg px-9 py-[105px]">
        <div className="space-y-4">
          {isSignUp && (
            <Input
              prefix={
                <div className="flex justify-center w-6">
                  {/* <img src={IcAccount} alt="username" /> */}
                </div>
              }
              placeholder="Họ tên"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          )}
          <Input
            // prefix={<img src={IcMail} alt="username" />}
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            onPressEnter={() => {
              handleLogin()
            }}
          />
          <Input.Password
            // prefix={<img src={IcLock} alt="password" />}
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPassWord(e.target.value)
            }}
            onPressEnter={() => {
              handleLogin()
            }}
          />
          {isSignUp && (
            <Input.Password
              // prefix={<img src={IcLock} alt="password" />}
              placeholder="Xác nhận mật khẩu"
              onBlur={(e) => {
                if (password !== e.target.value) {
                  setValidateSignUpPassword(false)
                } else {
                  setValidateSignUpPassword(true)
                }
              }}
            />
          )}
          <div className="flex text-[17px] xl:text-[18px] justify-between">
            {isSignUp ? (
              validateSignUpPassword === false && (
                <span className="flex items-center ">
                  <Icon className="text-[#EB5757] mb-[1px] mr-1" icon="ph:x" />
                  Mật khẩu chưa khớp
                </span>
              )
            ) : checkPassword ? (
              <div />
            ) : (
              <span className="flex items-center ">
                <Icon className="text-[#EB5757] mb-[1px] mr-1" icon="ph:x" />
                Mật khẩu sai
              </span>
            )}

            {isSignUp || (
              <span className="text-[17px] xl:text-[18px]  font-semibold">
                Quên mật khẩu?
              </span>
            )}
          </div>
        </div>
        <div className="space-y-[18px]">
          <Button
            className="w-full font-semibold text-white gradient_btn !shadow-none"
            onClick={() => {
              if (isSignUp) {
                handleSignUp()
              } else {
                handleLogin()
              }
            }}
          >
            {isSignUp ? 'Đăng ký' : 'Đăng nhập'}
          </Button>
          <Button
            className=" !bg-white text-[#333] font-semibold w-full !shadow-none"
            onClick={() => {
              handleLoginWithGoogle()
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              <IconLogoGoogle />
              <span className="text-black <2xs:text-[10px]">
                Đăng nhập bằng Google
              </span>
            </div>
          </Button>
        </div>
        {isSignUp ? (
          <div className="flex justify-center w-full space-x-1">
            <div>Bạn đã có tài khoản?</div>
            <div
              className=" font-semibold cursor-pointer"
              onClick={() => setIsSignUp(false)}
            >
              Đăng nhập
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full space-x-1">
            <div>Bạn chưa có tài khoản?</div>
            <div
              className=" font-semibold cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              Đăng ký
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default FormLogin
