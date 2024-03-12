import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
  return (
    // show create form
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// without using compount component   <Modal> <Modal.Open></Modal.Open><Modal>
// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         {isOpenModal ? 'Close Form' : 'Add new Cabin'}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal((isOpen) => !isOpen)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal((isOpen) => !isOpen)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
