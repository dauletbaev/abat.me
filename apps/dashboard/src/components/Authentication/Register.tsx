import { Link, useNavigate } from 'react-router-dom'
import { Register } from 'ui'
import { useForm } from '@mantine/form'
import { RegisterData as IFormData, useAuth } from '~/context/auth'

export const AuthRegister: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const form = useForm<IFormData>({
    initialValues: { firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' },

    validate: {
      username: (value) => (/^[a-zA-Z0-9_]*$/.test(value) ? null : 'Invalid username'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 letters' : null),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  })

  const handleSubmit = async (data: IFormData, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await auth.register(data)

    if (response.ok) {
      navigate('/auth/login')
    }
  }

  return (
    <Register anchorProps={{ component: Link, to: '/auth/login' }}>
      <Register.Form
        onSubmit={form.onSubmit(handleSubmit)}
        forgotPasswordAnchorProps={{ component: Link, to: '/forgot-password' }}
        firstNameProps={form.getInputProps('firstName')}
        lastNameProps={form.getInputProps('lastName')}
        usernameProps={form.getInputProps('username')}
        emailProps={form.getInputProps('email')}
        passwordProps={form.getInputProps('password')}
        confirmPasswordProps={form.getInputProps('confirmPassword')}
      />
    </Register>
  )
}
