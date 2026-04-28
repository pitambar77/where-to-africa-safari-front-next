import React from "react";

const QnADisplay = ({ title, items }) => (
  <div className="mt-10">
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    <div className="space-y-4">
      {items.map((q, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold text-lg mb-2">{q.question}</h4>
          {q.answer.map((ans, j) => {
            if (ans.type === "header") return <h5 key={j} className="font-bold">{ans.content}</h5>;
            if (ans.type === "paragraph") return <p key={j}>{ans.content}</p>;
            if (ans.type === "list")
              return (
                <ul key={j} className="list-disc ml-5">
                  {ans.content.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              );
            return null;
          })}
        </div>
      ))}
    </div>
  </div>
);

export default QnADisplay;
