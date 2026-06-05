import type { AgentProperty } from "../user/user.interface";

export interface BadgeInterface {
  text: string;
  className: string;
}

export interface AgentByIdPropertyCardProps {
  item: AgentProperty
}