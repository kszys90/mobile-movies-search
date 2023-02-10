import { useHeaderHeight } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';

type Props = {
    children?: React.ReactNode;
};

export const ScreenTemplate: React.FC<Props> = ({ children }) => {
    const headerHeight = useHeaderHeight();

    return (
        <LinearGradient
            colors={['#000000', '#393939', '#000000']}
            style={{ flex: 1, paddingTop: headerHeight ? headerHeight : 0, overflow: 'scroll' }}
        >
            {children}
        </LinearGradient>
    )
}