
export default function HowToCard({title,description}: {title: string, description: string}) {
  return (
    <div className="">
      <h2 className="text-[18px] font-medium">{title}</h2>
      <p className="mt-2 text-[14px]">
        {description}
      </p>
    </div>
  );
}
