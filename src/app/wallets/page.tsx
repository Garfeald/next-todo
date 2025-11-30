'use client'

import { Button } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import cls from './Wallets.module.scss';


const SUPPORTED_CHAINS = [
    { id: 1, name: 'Ethereum Mainnet' },
    { id: 11155111, name: 'Sepolia Testnet' },
    { id: 31337, name: 'Localhost 8545' },
    { id: 2, name: 'Two' }
]


export default function Wallets() {


    const { switchChain } = useSwitchChain()
    const { address, isConnected, chain } = useAccount()
    const { connect, connectors, error, status } = useConnect()
    const { disconnect } = useDisconnect()

    const handleDisconnect = useCallback(async (connector: any) => {
        await connect({ connector })
    }, [])

    // Просто используем status для определения состояния загрузки
    const isLoading = status === 'pending'

    function getFallbackIcon(connectorId: string) {
        const icons: { [key: string]: string } = {
            'metaMaskSDK': '🦊',
            'injected': '🔌',
            'walletConnect': '🔗',
            'coinbaseWallet': '💰',
            'brave': '🦁',
        }
        return icons[connectorId] || '👛'
    }

    // Функция для подключения MetaMask
    const handleConnectMetaMask = () => {
        const metaMaskConnector = connectors.find(c => c.id === 'metaMaskSDK')
        if (metaMaskConnector) {
            connect({ connector: metaMaskConnector })
        }
    }

    console.log('CONNECT!!!___METAMASK!!!!', connectors)

    // Функция для подключения инжектированных кошельков
    const handleConnectInjected = () => {
        const injectedConnector = connectors.find(c => c.id === 'injected')
        if (injectedConnector) {
            connect({ connector: injectedConnector })
        }
    }

    // Функция для Keplr
    const handleConnectKeplr = async () => {
        if (typeof window.keplr !== 'undefined') {
            try {
                await window.keplr.enable('cosmoshub-4')
                alert('Keplr connected!')
            } catch (error) {
                alert('Failed to connect to Keplr')
            }
        } else {
            alert('Please install Keplr!')
        }
    }

    // Форматирование адреса
    const formatAddress = (addr: string) => {
        return `${addr?.slice(0, 6)}...${addr?.slice(-4)}`
    }


    const success = useMemo(() => <h2 className="text-lg font-semibold text-green-800">✅ Кошелек подключен</h2>, [])

    const renderConnectors = useMemo(() => {
        if (connectors?.length) {
            return connectors.map(connector => {
                return (
                    <div key={connector.id} className={cls.connector}>
                        <div className={cls.connectorInfo}>
                            {connector.icon ? (
                                <img
                                    src={connector.icon}
                                    alt={connector.name}
                                    className={cls.connectorIcon}
                                />
                            ) : (
                                <span className={cls.fallbackIcon}>
                                    {getFallbackIcon(connector.id)}
                                </span>
                            )}
                            <div className={cls.connectorName}>
                                {connector.name}
                                {!connector.ready && <span className={cls.notAvailable}> (не доступен)</span>}
                            </div>
                        </div>
                        <Button
                            variant="outlined"
                            onClick={handleDisconnect}
                            disabled={isLoading}
                            className={cls.connectButton}
                        >
                            {'Отключить'}
                        </Button>
                    </div>
                )
            })
        }
    }, [])

    return (
        <div className={cls.container}>
            <div className={cls.buttons}>
                <Button
                    variant="outlined"
                    onClick={handleConnectMetaMask}
                >
                    Metamask
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleConnectKeplr}
                >
                    Keplr
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleConnectInjected}
                >
                    Injected
                </Button>
            </div>
            <div className={cls.connectors}>
                {renderConnectors}
            </div>
        </div>
    )

}
