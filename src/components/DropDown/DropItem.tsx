interface DropItem {
  text: string;
  selectCat: ({}:any) => void;
  toggleDropdown: () => void;
  resetProducts : ()=>void;
  id:string
}
const DropItem = ({ text,selectCat,toggleDropdown ,resetProducts,id}: DropItem) => {
  return (
    <li onClick={(e:any)=>{
        toggleDropdown()
        selectCat({
          text,
          id
        } as any)
        console.log({text,id})
        resetProducts()
    }}>
      <a
        className="block w-full whitespace-nowrap bg-gray-400 px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
        href="#"
        data-twe-dropdown-item-ref
      >
        {text}
      </a>
    </li>
  );
};

export default DropItem;
