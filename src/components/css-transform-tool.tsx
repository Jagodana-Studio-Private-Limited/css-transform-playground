"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface TransformState {
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
  perspective: boolean;
  perspectiveValue: number;
}

const DEFAULTS: TransformState = {
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  perspective: false,
  perspectiveValue: 800,
};

function buildTransformCSS(s: TransformState): string {
  const parts: string[] = [];
  if (s.translateX !== 0) parts.push(`translateX(${s.translateX}px)`);
  if (s.translateY !== 0) parts.push(`translateY(${s.translateY}px)`);
  if (s.translateZ !== 0) parts.push(`translateZ(${s.translateZ}px)`);
  if (s.rotateX !== 0) parts.push(`rotateX(${s.rotateX}deg)`);
  if (s.rotateY !== 0) parts.push(`rotateY(${s.rotateY}deg)`);
  if (s.rotateZ !== 0) parts.push(`rotateZ(${s.rotateZ}deg)`);
  if (s.scaleX !== 1) parts.push(`scaleX(${s.scaleX})`);
  if (s.scaleY !== 1) parts.push(`scaleY(${s.scaleY})`);
  if (s.skewX !== 0) parts.push(`skewX(${s.skewX}deg)`);
  if (s.skewY !== 0) parts.push(`skewY(${s.skewY}deg)`);
  return parts.length > 0 ? parts.join("\n  ") : "none";
}

function buildFullCSS(s: TransformState): string {
  const transform = buildTransformCSS(s);
  const lines: string[] = [".element {"];
  if (s.perspective) {
    lines.push(`  perspective: ${s.perspectiveValue}px;`);
  }
  if (transform === "none") {
    lines.push(`  transform: none;`);
  } else {
    lines.push(`  transform:`);
    lines.push(`    ${transform.split("\n  ").join("\n    ")};`);
  }
  lines.push("}");
  return lines.join("\n");
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
}

function SliderRow({ label, value, min, max, step, unit, onChange }: SliderRowProps) {
  return (
    <div className="flex items-center gap-3">
      <Label className="w-28 shrink-0 text-xs text-muted-foreground">{label}</Label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="flex-1"
      />
      <span className="w-20 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
        {value}
        {unit}
      </span>
    </div>
  );
}

export function CSSTransformTool() {
  const [state, setState] = useState<TransformState>(DEFAULTS);

  const update = useCallback(<K extends keyof TransformState>(key: K, value: TransformState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  const cssCode = buildFullCSS(state);

  const transformValue = buildTransformCSS(state);
  const previewStyle: React.CSSProperties = {
    transform: transformValue === "none" ? undefined : transformValue.split("\n  ").join(" "),
    ...(state.perspective ? { perspective: `${state.perspectiveValue}px` } : {}),
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode).then(() => {
      toast.success("CSS copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy to clipboard");
    });
  }, [cssCode]);

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-6 w-full">
      {/* Preview + Code */}
      <div className="flex flex-col gap-6">
        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-xl bg-muted/40 border border-dashed border-border min-h-64">
              <div
                style={previewStyle}
                className="w-32 h-32 rounded-xl bg-gradient-to-br from-brand to-brand-accent shadow-lg shadow-brand/25 flex items-center justify-center text-white font-semibold text-sm select-none transition-none"
              >
                Preview
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated CSS */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Generated CSS
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                <Copy className="h-3.5 w-3.5" />
                Copy CSS
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-muted px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre text-foreground">
              {cssCode}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Controls
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-xs text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Translate */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Translate</p>
            <div className="flex flex-col gap-3">
              <SliderRow label="translateX" value={state.translateX} min={-300} max={300} step={1} unit="px" onChange={(v) => update("translateX", v)} />
              <SliderRow label="translateY" value={state.translateY} min={-300} max={300} step={1} unit="px" onChange={(v) => update("translateY", v)} />
              <SliderRow label="translateZ" value={state.translateZ} min={-500} max={500} step={1} unit="px" onChange={(v) => update("translateZ", v)} />
            </div>
          </div>

          <Separator />

          {/* Rotate */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Rotate</p>
            <div className="flex flex-col gap-3">
              <SliderRow label="rotateX" value={state.rotateX} min={-180} max={180} step={1} unit="°" onChange={(v) => update("rotateX", v)} />
              <SliderRow label="rotateY" value={state.rotateY} min={-180} max={180} step={1} unit="°" onChange={(v) => update("rotateY", v)} />
              <SliderRow label="rotateZ" value={state.rotateZ} min={-180} max={180} step={1} unit="°" onChange={(v) => update("rotateZ", v)} />
            </div>
          </div>

          <Separator />

          {/* Scale */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Scale</p>
            <div className="flex flex-col gap-3">
              <SliderRow label="scaleX" value={state.scaleX} min={0} max={3} step={0.01} unit="×" onChange={(v) => update("scaleX", v)} />
              <SliderRow label="scaleY" value={state.scaleY} min={0} max={3} step={0.01} unit="×" onChange={(v) => update("scaleY", v)} />
            </div>
          </div>

          <Separator />

          {/* Skew */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Skew</p>
            <div className="flex flex-col gap-3">
              <SliderRow label="skewX" value={state.skewX} min={-80} max={80} step={1} unit="°" onChange={(v) => update("skewX", v)} />
              <SliderRow label="skewY" value={state.skewY} min={-80} max={80} step={1} unit="°" onChange={(v) => update("skewY", v)} />
            </div>
          </div>

          <Separator />

          {/* Perspective */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Perspective</p>
              <div className="flex items-center gap-2">
                <Label htmlFor="perspective-switch" className="text-xs text-muted-foreground">
                  {state.perspective ? "On" : "Off"}
                </Label>
                <Switch
                  id="perspective-switch"
                  checked={state.perspective}
                  onCheckedChange={(checked) => update("perspective", checked)}
                />
              </div>
            </div>
            {state.perspective && (
              <SliderRow
                label="perspective"
                value={state.perspectiveValue}
                min={100}
                max={2000}
                step={10}
                unit="px"
                onChange={(v) => update("perspectiveValue", v)}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
