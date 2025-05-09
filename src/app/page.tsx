import { Button } from "./components/Button";

export default function Home() {
  return (
    <div className="bg-surface-background">
      <h1 className="text-content-neutral-base">Texto</h1>
      <Button buttonType="ghost" buttonColor="success">Criança</Button>
    </div>
  );
}
