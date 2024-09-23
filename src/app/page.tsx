import { Metadata } from 'next'
import Image from "next/image";
import Button from "@/ui/Buttons/ButtonText";
import PlayButton from "@/ui/Buttons/Play";
import { MainSpinner } from "@/ui/Loaders";
import { Logo } from "@/ui/Logo";


export default function Home() {
  return (

    <main className="h-10">
      <Logo/>
      <Button color="primary" size="medium" >
          Ingresar
      </Button>
      <PlayButton/>
      <MainSpinner/>
    </main>
  );
}
