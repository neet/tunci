import { translate } from "./actions";
import { Translator } from "@/components/Translator/Translator";

export default function Home() {
  return (
    <main className="grow w-full max-w-screen-xl mx-auto">
      <Translator action={translate} className="mt-4" />
    </main>
  );
}
