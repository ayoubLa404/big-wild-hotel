import { styled } from 'styled-components';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: orangered;
`;
const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  cursor: pointer;
`;
const Input = styled.input`
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
export default function App() {
  return (
    <div>
      <H1>the wild oasis</H1>
      <Button>Check IN</Button>
      <Button>Check out</Button>
      <Input type="number" placeholder="Number of guests" />
    </div>
  );
}
