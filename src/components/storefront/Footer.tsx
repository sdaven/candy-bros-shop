export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Candy Bros</h3>
            <p className="text-sm text-muted-foreground">
              Premium candy, delivered by hand to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-muted-foreground hover:text-foreground">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="text-muted-foreground hover:text-foreground">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Questions? Reach out to us at{" "}
              <a href="mailto:hello@candybros.app" className="text-purple-600 hover:underline">
                hello@candybros.app
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Candy Bros. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
