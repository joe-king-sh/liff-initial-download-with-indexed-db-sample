type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <>
    <div className="w-full">{children}</div>
    {/* モーダル表示用 */}
    <div id="portal" />
  </>
);
Layout.displayName = "Layout";
