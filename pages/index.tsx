import useRequireAuth from '../lib/useRequireAuth'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import{ useSession, signOut, getSession} from "next-auth/react"

export async function getServerSideProps(content){  
  const session = await getSession(content);

 if(!session){               //  segunda forma de autenticação/ sem middleware
    return{
      redirect:{
      destination: "/login",
        permanent: false
      }
   }
  }

  return  {
    props:{
      session,
    }
  }
}

const Home: NextPage = () => {
   const { data : session } = useSession();
  
  
  
   //const session = useRequireAuth();
  //if(!session) return <div>... loading</div>
  
  return (
    
    
<div className="flex h-screen items-center justify-center bg-indigo-50 px-4">
  <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
    <img src="http//imgur.com/a/Krq7Sp4" alt="" className="h-auto w-full" />
    <div className="p-5">
      <p className="text-medium mb-5 text-gray-700">{`Seja muito bem vindo nessa plataforma ${session?.user.name}, aqui  é o seu lugar `}</p>
      <button onClick={() =>signOut()} className="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75">Sair</button>
    </div>
  </div>
</div>
    
  )
}

export default Home
