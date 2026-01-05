import { EscrowFlowCard } from "../EscrowFlowCard";

export default function EscrowFlowCardExample() {
  return (
    <div className="p-4 max-w-md">
      <EscrowFlowCard currentStep={2} />
    </div>
  );
}
