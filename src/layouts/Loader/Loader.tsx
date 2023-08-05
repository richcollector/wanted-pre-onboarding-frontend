import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100dvw;
  height: 100dvh;

  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 1320px;
  height: 100%;
`;
export default function Loader() {
  return (
    <>
      <Container>
        <Wrapper>
          <h3>Loading...</h3>
        </Wrapper>
      </Container>
    </>
  );
}
