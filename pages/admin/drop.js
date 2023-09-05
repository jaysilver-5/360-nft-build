import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import router from 'next/router'
import Loader from '../../components/basic/loader/Loader'



const Drop = () => {
    // const { Moralis, enableWeb3, web3 } = useMoralis()
    // const { data: feedData, error, isLoading, fetch} = useMoralisCloudFunction('getNonSentNFTs')

    const walletAddress = useSelector(state => state.user.walletAddress)

    const sendToken = async(receiver, id) => {
        if (!receiver) {
            alert('Please enter wallet address of the receipient')
            return
        }
        const options = {type: "erc721",  
            receiver: receiver,
            contractAddress: '0xB262E527ac2C2c788316421aD9129B5B3ccFfd0C',
            tokenId: id
        }
        const express = require("express");
        const app = express();
        // This is a public sample test API key.
        // Don’t submit any personally identifiable information in requests made with this key.
        // Sign in to see your own test API key embedded in code samples.
        const Stripe = require("stripe");
        const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
        const OnrampSessionResource = Stripe.StripeResource.extend({
          create: Stripe.StripeResource.method({
            method: 'POST',
            path: 'crypto/onramp_sessions',
          }),
        });
        
        
        app.use(express.static("public"));
        app.use(express.json());
        
        app.post("/create-onramp-session", async (req, res) => {
          const { transaction_details } = req.body;
        
          // Create an OnrampSession with the order amount and currency
          const onrampSession = await new OnrampSessionResource(stripe).create({
            transaction_details: {
              destination_currency: transaction_details["destination_currency"],
              destination_exchange_amount: transaction_details["destination_exchange_amount"],
              destination_network: transaction_details["destination_network"],
            },
            customer_ip_address: req.socket.remoteAddress,
          });
        
          res.send({
            clientSecret: onrampSession.client_secret,
          });
        });
        
        app.listen(4242, () => console.log("Node server listening on port 4242!")).then(async (data) => {
            const ItemClass = await Moralis.Object.extend('Item')
            const query = new Moralis.Query(ItemClass).equalTo('tokenId', id)
            const results = await query.find()
            const user = JSON.parse(JSON.stringify(results))
            const objId = (user[0].objectId)
            const userObj = await new Moralis.Query(ItemClass).get(objId)
            userObj.set('nftSent', true)
            await userObj.save()
            console.log(data);
            alert(data.message)
        })
        .catch((err) => alert(err.message))

    }

    
   
    useEffect(() => {
        enableWeb3()
        if (walletAddress != 0x5D25Da9379943E88A35954dB0F5fe218f50AC00E) {
            alert('Unauthorized!')
            router.push('/feed')
        }
    }, [])

    return (
        <div>
            { isLoading ? <div className='centerDivItems'><Loader/></div> : (feedData && 
                                (
                                    feedData.length >= 1 ? 
                                        feedData.slice(0).reverse().map((res, ind) => (
                                            <li key={ind}>
                                                <p>Title: {res.title}</p>
                                                <p>Desc: {res.description}</p>
                                                <p>Artist: {res.artist}</p>
                                                <p>Buyer: {res.receiver}</p>
                                                {web3.utils.isAddress(res.receiver) ?
                                                    <button onClick={() => sendToken(res.receiver, res.id)}>Send to buyer</button>
                                                    :
                                                    <div>
                                                        <input id={`input${res.id}`} type="text" placeholder='Enter Wallet Address' />
                                                        <button onClick={() => sendToken(document.getElementById(`input${res.id}`).value, res.id)}>Send to buyer</button><span>{res.name}</span>
                                                    </div>}
                                                <hr/>
                                            </li>))
                                    :
                                    <h1>Nothing to show</h1>
                                ))
                            }
        </div>
    )
}

export default Drop
