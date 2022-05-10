import "../../styles/reusables/message.css";

type Props = {
  text: string;
  className?: string;
};

const Message = ({ text, className }: Props) => {
  return <div className={`message ${className}`}>{text}</div>;
};

export default Message;
