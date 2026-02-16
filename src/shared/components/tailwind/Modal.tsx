type Props = {
  children: React.ReactNode;
};

export const Modal = ({ children }: Props) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/85 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center items-start sm:items-center px-4 pt-16 text-center sm:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

// export const DeleteModal = ({ text, setOpen, action }: Props) => {
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const handleOk = async () => {
//     setConfirmLoading(true);
//     await action();
//     setConfirmLoading(false);
//      setOpen(false);
//   };
//   const handleCancel = () => {
//     setOpen(false);
//   };
//   return (
//     <Modal>
//       <div className="flex flex-col bg-white rounded-lg px-4 pt-4 pb-2 gap-2 max-w-100">
//         <h2 className="text-black">{text}</h2>
//         <div className="flex w-full justify-end">
//           <div className="flex max-w-[40%] gap-1">
//             <Button onClick={handleOk} text="Ok" color="green" />
//             <Button onClick={handleCancel} text="Отмена" color="blue" />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };
