import styled from 'styled-components';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

function CabinTable() {
  const { cabins, isLoading, isError } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    // menus keep truck which menu(dup,edit,delete) is open
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        {/* {cabins?.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
