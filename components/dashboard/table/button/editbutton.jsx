import ActionButton from "./ActionButton";

export function EditButton({ onClick }) {
  return (
    <ActionButton
      color="bg-orange-300"
      hoverColor="hover:bg-orange-400"
      iconSrc="/icons/dashboard/edit-yellow.svg"
      alt="Edit"
      onClick={onClick}
    />
  );
}
