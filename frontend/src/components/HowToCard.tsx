
export default function HowToCard({title,description}: {title: string, description: string}) {
  return (
    <div className="">
      <h1 className="text-[18px] font-medium">{title}</h1>
      <p className="mt-2 text-[14px]">
        {description}
      </p>
    </div>
  );
}
