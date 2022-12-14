import styled from 'styled-components';

const Header = styled.header`
    display: flex;
`

const Head = styled.div`
    margin-top: 1.5rem;
    margin-left: 5%;
    width: fit-content;
`

const Subtitle = styled.p`
    font-size: 20px;
    font-weight: 500;
`

function PageSubtitle( {subtitle, click, cnt} ) {
    return(
        <Header>
            <Head>
                {cnt ? (
                <Subtitle onClick={click}>
                    {subtitle} ({cnt}개)
                </Subtitle> ) : (
                <Subtitle onClick={click}>
                    {subtitle} 
                </Subtitle>
                )}
            </Head>
        </Header>
    )
}
export default PageSubtitle;