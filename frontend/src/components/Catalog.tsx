'use client';
interface Block {
  style: string;
  _key: string;
  children: { text: string }[];
}

interface Blog {
  body: Block[];
}

export default function Catalog({ blog }: { blog: Blog[] }) {
  return (
    <div className='flex flex-col gap-4 font-medium cursor-pointer'>
      {blog[0]?.body
        .filter((block: Block) => block.style === "h2")
        .map((block: Block, index: number) => (
          <div
            key={index}
            onClick={() => {
              const element = document.getElementById(block._key);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className=""
          >
            {block.children.map((child: { text: string }) => child.text).join(" ")}
          </div>
        ))}
    </div>
  );
}