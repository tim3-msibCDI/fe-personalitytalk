import ActionButton from "./ActionButton";

export function ShowButton({ onClick }) {
  return (
    <ActionButton
      color="bg-green-300"
      hoverColor="hover:bg-green-400"
      iconSrc="/icons/dashboard/eye-green.svg"
      alt="View"
      onClick={onClick}
    />
  );
}

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
