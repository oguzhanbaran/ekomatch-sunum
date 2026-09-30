import { FormEvent, useRef, useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const logoUrl = new URL('../../logo-mini.png', import.meta.url).href

type LoginGateProps = {
  onAuthenticated: () => void
}

export function LoginGate({ onAuthenticated }: LoginGateProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const passwordRef = useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username === 'finnovate' && password === 'fin12fin12.') {
      setError('')
      onAuthenticated()
      return
    }

    setError('Kullanıcı adı veya parola hatalı. Bilgileri kontrol edip tekrar deneyin.')
    setPassword('')
    window.requestAnimationFrame(() => passwordRef.current?.focus())
  }

  return (
    <main className="login-gate">
      <div className="login-gate__grid" aria-hidden="true" />
      <div className="login-gate__glow login-gate__glow--one" aria-hidden="true" />
      <div className="login-gate__glow login-gate__glow--two" aria-hidden="true" />

      <motion.section
        className="login-panel"
        aria-labelledby="login-title"
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: .99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : .38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="login-brand" aria-label="EkoMatch">
          <span className="login-brand__mark">
            <img src={logoUrl} alt="" draggable={false} />
          </span>
          <span className="login-brand__name">EkoMatch</span>
        </div>

        <div className="login-heading">
          <span className="login-kicker"><i /> FINNOVATE · GÜVENLİ ERİŞİM</span>
          <h1 id="login-title">Sunuma erişim</h1>
          <p>İçeriği görüntülemek için size iletilen giriş bilgilerini kullanın.</p>
        </div>

        <form className="login-form" onSubmit={submit} noValidate>
          <div className="login-field">
            <label htmlFor="login-username">Kullanıcı adı</label>
            <div className="login-input">
              <UserRound aria-hidden="true" />
              <input
                id="login-username"
                name="username"
                type="text"
                value={username}
                onChange={event => {
                  setUsername(event.target.value)
                  if (error) setError('')
                }}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Parola</label>
            <div className="login-input">
              <LockKeyhole aria-hidden="true" />
              <input
                ref={passwordRef}
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => {
                  setPassword(event.target.value)
                  if (error) setError('')
                }}
                autoComplete="current-password"
                required
                aria-describedby={error ? 'login-error' : undefined}
                aria-invalid={Boolean(error)}
              />
              <button
                className="login-password-toggle"
                type="button"
                onClick={() => setShowPassword(current => !current)}
                aria-label={showPassword ? 'Parolayı gizle' : 'Parolayı göster'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="login-error" id="login-error" role="alert" aria-live="polite">
            {error}
          </div>

          <button className="login-submit" type="submit">
            <span>Sunumu aç</span>
            <ArrowRight aria-hidden="true" />
          </button>
        </form>

      </motion.section>
    </main>
  )
}
