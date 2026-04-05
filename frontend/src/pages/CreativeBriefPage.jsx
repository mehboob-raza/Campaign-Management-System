import { useState } from "react";
import axios from "axios";

export default function CreativeBriefPage() {
  const [product, setProduct] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await axios.post("http://localhost:6000/generate/copy", {
      product,
    });
    setResult(res.data);
  };

  return (
    <div className="p-6">
      <input onChange={(e) => setProduct(e.target.value)} />
      <button onClick={generate}>Generate</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}