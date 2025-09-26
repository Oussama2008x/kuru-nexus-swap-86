import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TOKENS } from '@/lib/contracts';
import { useUniswapSwap } from '@/hooks/useUniswapSwap';
import { useToast } from '@/hooks/use-toast';

// Admin-only helper to batch create liquidity pairs WMON/<token>
export const LiquidityAdminTools: React.FC = () => {
  const { createAllLiquidityPairs, isLoading } = useUniswapSwap();
  const { toast } = useToast();

  const tokensWithoutWMON = useMemo(() => TOKENS.filter(t => t.symbol !== 'WMON'), []);

  const [amounts, setAmounts] = useState<Record<string, { tokenAmount: string; wmonAmount: string }>>(
    () => Object.fromEntries(tokensWithoutWMON.map(t => [t.symbol, { tokenAmount: '', wmonAmount: '' }]))
  );

  const handleChange = (symbol: string, field: 'tokenAmount' | 'wmonAmount', value: string) => {
    // Basic numeric validation
    const sanitized = value.replace(/[^0-9.]/g, '');
    setAmounts(prev => ({
      ...prev,
      [symbol]: {
        ...prev[symbol],
        [field]: sanitized,
      },
    }));
  };

  const handleCreateAll = async () => {
    // Filter out empty rows
    const payload = Object.fromEntries(
      Object.entries(amounts).filter(([, v]) => Number(v.tokenAmount) > 0 && Number(v.wmonAmount) > 0)
    );

    if (Object.keys(payload).length === 0) {
      toast({
        title: 'No amounts provided',
        description: 'أدخل مبالغ لكل زوج تريد إنشاء سيولته',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createAllLiquidityPairs(payload as Record<string, { tokenAmount: string; wmonAmount: string }>);
    } catch {}
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-base">Liquidity Tools (Admin) — WMON Base</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          أدخل مبالغ مخصصة لكل زوج لتكوين السيولة تلقائيًا: TOKEN/WMON. سيتم طلب الموافقة فقط للرمز المحدد (ليس WMON).
        </p>

        <div className="grid gap-3">
          {tokensWithoutWMON.map((t) => (
            <div key={t.symbol} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div>
                <Label className="text-xs">Token ({t.symbol}) Amount</Label>
                <Input
                  inputMode="decimal"
                  placeholder="0.0"
                  value={amounts[t.symbol]?.tokenAmount ?? ''}
                  onChange={(e) => handleChange(t.symbol, 'tokenAmount', e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">WMON Amount</Label>
                <Input
                  inputMode="decimal"
                  placeholder="0.0"
                  value={amounts[t.symbol]?.wmonAmount ?? ''}
                  onChange={(e) => handleChange(t.symbol, 'wmonAmount', e.target.value)}
                />
              </div>
              <div className="text-xs text-muted-foreground md:text-right">Pair: {t.symbol}/WMON</div>
            </div>
          ))}
        </div>

        <Button onClick={handleCreateAll} disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? 'Processing…' : 'Create All WMON Pairs'}
        </Button>
      </CardContent>
    </Card>
  );
};
