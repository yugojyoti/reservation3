import { Item } from "@prisma/client";

export default function MenuCard({ item }: { item: Item }) {
  return (
    <div className=" border-2 rounded p-3 w-[49%] mb-3 hover:bg-slate-100">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p className="font-light mt-1 text-sm">{item.description}</p>
      <p className="mt-7">{item.price}</p>
    </div>
  );
}
