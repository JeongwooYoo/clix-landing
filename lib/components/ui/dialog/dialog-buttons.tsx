import type { ButtonProps } from '@/lib/components/ui/button';
import { Button } from '@/lib/components/ui/button';

export function DialogConfirmButton({ variant = 'default', children = 'confirm', ...props }: ButtonProps) {
    return (
        <Button variant={variant} {...props}>
            {children}
        </Button>
    );
}

export function DialogCancelButton({ variant = 'secondary', children = 'cancel', ...props }: ButtonProps) {
    return (
        <Button variant={variant} {...props}>
            {children}
        </Button>
    );
}
