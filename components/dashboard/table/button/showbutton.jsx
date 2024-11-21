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
