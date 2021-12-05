import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'
import { signIn, useSession} from 'next-auth/client'


export function SignInButton() {

    const [session] = useSession();


    return (
        <button type="button" onClick={ ()=>signIn("")} className={styles.signInButton}> <FaGithub color={session ? "#eba417" : "#04d361"} /> {session ? session.user.name : "Sign in with Github"}{session? <FiX color="737300" className={styles.closeIcon}/> : ""}</button>
    )
}
