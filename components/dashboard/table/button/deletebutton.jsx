import ActionButton from "./ActionButton";

export function DeleteButton({ onClick }) {
  return (
    <ActionButton
      color="bg-red-300"
      hoverColor="hover:bg-red-400"
      iconSrc="/icons/dashboard/trash-red.svg"
      alt="Delete"
      onClick={onClick}
    />
  );
}
