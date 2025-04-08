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
  const blocks = blog[0]?.body || [];

  // Step 1: Nest h3s under corresponding h2s
  const toc: { h2: Block; h3s: Block[] }[] = [];
  let currentH2: { h2: Block; h3s: Block[] } | null = null;

  for (const block of blocks) {
    if (block.style === 'h2') {
      currentH2 = { h2: block, h3s: [] };
      toc.push(currentH2);
    } else if (block.style === 'h3' && currentH2) {
      currentH2.h3s.push(block);
    }
  }

  return (
    <div className="flex flex-col gap-1 font-medium text-[14px]">
      <h3 className="font-semibold mb-3 text-[18px]">Table of Contents</h3>

      {toc.map((item, i) => (
        <div key={i} className="mb-0">
          {/* h2 */}
          <div
            onClick={() => {
              const el = document.getElementById(item.h2._key);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-blue-700 hover:text-blue-500 cursor-pointer"
          >
            {item.h2.children.map((child) => child.text).join(" ")}
          </div>

          {/* h3s */}
          <div className="ml-4 mt-1 space-y-1">
            {item.h3s.map((h3, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const el = document.getElementById(h3._key);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-blue-400 hover:text-blue-400 cursor-pointer text-sm"
              >
                {h3.children.map((child) => child.text).join(" ")}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
